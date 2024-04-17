<template>
    
    <header>
        <div class="IMGHEADER">

            <img src="../assets/Header.png" alt="Usuario" />
        </div>

    </header>
    <div class="MegaBox">
    <div class="user-panel">
  <UsuarioView/>
      </div>

        <div class="calendar">
            <div class="titulo">
                <h2>Bienvenido A Tu Calendario</h2>
            </div>
            <div class="month" v-for="(month, index) in months" :key="index">
                <h2>{{ month.name }}</h2>
                <div class="days">
                    <div class="day" v-for="(day, dayIndex) in month.days" :key="dayIndex">
                        <div class="day-content">
                            <span class="day-number">{{ day !== '0' ? day : '' }}</span>
                            <div class="activities">
                                <div 
                                class="activity"
                                v-for="activity in getActivitiesForDay(month.activities, day)" 
                                :key="activity.IDA"
                                :class="getActivityClass(activity.Importancia)"
                                @click="redirect(activity.IDA)"
                                >
                                <div class="activity-title">{{ activity.Titulo }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>

  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import UserService from '@/services/AuthServices';
  import type IActividad from '@/Interface/IActividad';
  import { useRoute, useRouter } from 'vue-router';
  import UsuarioView from './Usuario.vue'

  
  interface MonthData {
    name: string;
    days: string[];
    activities: { [day: string]: IActividad[] };
  }
  
  const token = ref<string>('');
  const IDU = ref<number>(0);
  const months = ref<MonthData[]>([]);
  const route = useRoute();
  const router = useRouter();
  
  onMounted(async () => {
    const tokenFromStorage = localStorage.getItem('token');
    const IDFromStorage = localStorage.getItem('IDU');
  
    if (tokenFromStorage && IDFromStorage) {
      token.value = tokenFromStorage;
      IDU.value = parseInt(IDFromStorage);
  
      try {
        const actividades = await UserService.GetAct(IDU.value);
        if (actividades && Array.isArray(actividades)) {
          organizeActivitiesByMonth(actividades);
        } else {
          console.error('No se encontraron actividades para el ID especificado.');
        }
      } catch (error) {
        console.error('Error al obtener las actividades:', error);
      }
    } else {
      console.warn('No hay token en el almacenamiento local. No se obtendrán actividades.');
    }
  });
  
  const organizeActivitiesByMonth = (activities: IActividad[]) => {
    const groupedByMonth: { [key: string]: { [day: string]: IActividad[] } } = {};
  
    activities.forEach(actividad => {
      const date = new Date(actividad.FechaTermino);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const dayKey = `${date.getDate()}`;
      if (!groupedByMonth[monthKey]) {
        groupedByMonth[monthKey] = {};
      }
      if (!groupedByMonth[monthKey][dayKey]) {
        groupedByMonth[monthKey][dayKey] = [];
      }
      groupedByMonth[monthKey][dayKey].push(actividad);
    });
  
    for (const monthKey in groupedByMonth) {
      const [year, month] = monthKey.split('-').map(Number);
      const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
      const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // Day of the week (0-6)
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      const daysArray = [];
  
      // Fill days before the first day of the month with 0s
      for (let i = 0; i < firstDayOfMonth; i++) {
        daysArray.push('0');
      }
  
      // Fill days of the month
      for (let i = 1; i <= lastDayOfMonth; i++) {
        daysArray.push(i.toString());
      }
  
      // Fill remaining days of the week with 0s
      const remainingDays = 7 - (daysArray.length % 7);
      if (remainingDays < 7) {
        for (let i = 0; i < remainingDays; i++) {
          daysArray.push('0');
        }
      }
  
      months.value.push({
        name: `${monthName} ${year}`,
        days: daysArray,
        activities: groupedByMonth[monthKey]
      });
    }
  };
  
  const getActivitiesForDay = (activities: { [day: string]: IActividad[] }, day: string): IActividad[] => {
    return activities[day] || [];
  };
  
  const replaceDayWithDate = (day: string, endDate: string): string => {
    return day !== '0' ? endDate : '';
  };
  
  const getActivityClass = (importance: number): string => {
    if (importance === 1) {
      return 'activity-important';
    } else if (importance === 2) {
      return 'activity-less-important';
    } else {
      return 'activity-not-important';
    }
  };
  
  const redirect = (IDA: number) => {
    router.push(`/Act/${IDA}`);
  };
  </script>
  
  <style scoped>
  .calendar {
    display: grid;
    width: 70%;
  }
  .MegaBox{
    display: flex;
    width: 100%;
    margin-top: 5%;

  }
  .month {
    flex: 1 0 30%;
    margin: 10px;
  }
  
  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  
  .day {
    position: relative;
    text-align: center;
    border: 1px solid #ccc;
    padding: 5px;
    height: 100px;
  }
  
  .day-content {
    position: relative;
  }
  
  .day-number {
    font-weight: bold;
    width: 25px;
    height: 25px;
    display: inline-block;
  }
  
  .activities {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    right: 0;
    display: grid;
    grid-gap: 5px;
  }
  
  .activity {
    border: 1px solid #ccc;
    padding: 5px;
  }
  
  .activity-important {
    background-color: #FFCDD2; /* Red */
    cursor: pointer;
  }
  
  .activity-less-important {
    background-color: #FFF9C4; /* Yellow */
    cursor: pointer;

  }
  
  .activity-not-important {
    background-color: #B2DFDB; /* Blue */
    cursor: pointer;

  }
  
  .activity-title {
    font-weight: bold;
  }
  
  .activity-description {
    margin-top: 3px;
  }
  
  .activity-end-date {
    margin-top: 3px;
    font-size: 0.8em;
    color: #666;
  }
  </style>
  
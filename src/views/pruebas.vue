<template>
  <div class="calendar">
    <div class="month" v-for="(month, index) in months" :key="index">
      <h2>{{ month.name }}</h2>
      <div class="days">
        <div class="day" v-for="(day, dayIndex) in month.days" :key="dayIndex">
          <div class="day-content">
            <span class="day-number">{{ day !== 0 ? day : '' }}</span>
            <div class="activities">
              <div class="activity" v-for="activity in month.activities[day]" :key="activity.id">
                <div class="activity-title">{{ activity.title }}</div>
                <div class="activity-description">{{ activity.description }}</div>
                <div class="activity-end-date">{{ activity.endDate }}</div>
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
import { useRoute } from 'vue-router';

interface MonthData {
  name: string;
  days: number[];
  activities: { [day: number]: IActividad[] };
}

const token = ref<string>('');
const IDU = ref<number>(0);
const months = ref<MonthData[]>([]);
const route = useRoute();

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
  const groupedByMonth: { [key: string]: { activities: { [day: number]: IActividad[] }; days: number[] } } = {};

  activities.forEach(actividad => {
    const date = new Date(actividad.FechaTermino);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!groupedByMonth[monthKey]) {
      groupedByMonth[monthKey] = { activities: {}, days: [] };
    }
    const day = date.getDate();
    if (!groupedByMonth[monthKey].activities[day]) {
      groupedByMonth[monthKey].activities[day] = [];
    }
    groupedByMonth[monthKey].activities[day].push(actividad);
    groupedByMonth[monthKey].days.push(day);
  });

  for (const monthKey in groupedByMonth) {
    const [year, month] = monthKey.split('-').map(Number);
    const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // Day of the week (0-6)
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    const daysArray = [];

    // Fill days before the first day of the month with 0s
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(0);
    }

    // Fill days of the month
    for (let i = 1; i <= lastDayOfMonth; i++) {
      daysArray.push(i);
    }

    // Fill remaining days of the week with 0s
    const remainingDays = 7 - (daysArray.length % 7);
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        daysArray.push(0);
      }
    }

    months.value.push({
      name: `${monthName} ${year}`,
      days: daysArray,
      activities: groupedByMonth[monthKey].activities
    });
  }
};

const getActivitiesTitle = (activities: IActividad[] | undefined): string => {
  if (!activities || activities.length === 0) {
    return ''; // Si no hay actividades para este día, retorna una cadena vacía
  }
  return activities.map(activity => activity.Titulo).join(', '); // Concatena los títulos de las actividades separados por coma
};
</script>

<style scoped>
.calendar {
  display: grid;
  width: 100%;
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
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 5px;
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

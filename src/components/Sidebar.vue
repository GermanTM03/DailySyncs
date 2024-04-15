<template>
	<aside :class="{ 'expanded': isExpanded }">
	  <div class="menu">
		<!-- Botón para abrir/cerrar el sidebar -->
		<button @click="toggleSidebar" class="toggle-sidebar">&#9776;</button>
		<router-link to="/">Home</router-link>
		<router-link to="/about">About</router-link>
		<router-link to="/settings">Settings</router-link>
	  </div>
	</aside>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isExpanded = ref(false); 
  
  const toggleSidebar = () => {
	isExpanded.value = !isExpanded.value;
  };
  </script>
  
  <style scoped>
  aside {
	width: 200px;
	height: 100%;
	background-color: #333;
	color: white;
	position: fixed;
	top: 94px; 
	left: 0;
	transition: transform 0.3s ease;
	transform: translateX(-70%); 
  }
  
  .expanded {
	transform: translateX(0);
  }
  
  .menu {
	padding-top: 50px;
  }
  
  .menu a {
	display: block;
	padding: 10px 20px;
	color: white;
	text-decoration: none;
  }
  
  .toggle-sidebar {
	position: absolute;
	top: 10px;
	left: 150px;
	cursor: pointer;
	font-size: 24px;
  }
  </style>
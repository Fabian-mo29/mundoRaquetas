<template>
  <div class="payment-methods-container">
    <h2>Mis Tarjetas Guardadas</h2>
    
    <div v-if="loading" class="loading-spinner">
      Cargando...
    </div>
    
    <div v-else>
      <div class="card-list">
        <div v-for="card in savedCards" :key="card.Id" class="card-item">
          <div class="card-info">
            <h4>{{ card.Alias }}</h4>
            <p>Terminada en {{ card.MaskedNumber.slice(-4) }}</p>
            <p>Vence {{ card.expiryDate }}</p>
            <p>Titular: {{ card.NombreTitular }}</p>
          </div>
          <div class="card-actions">
            <button @click="deleteCard(card.Id)" class="btn btn-danger">
              Eliminar
            </button>
          </div>
        </div>
      </div>
      
      <div class="add-card-form">
        <h3>Agregar Nueva Tarjeta</h3>
        <form @submit.prevent="saveNewCard">
          <div class="form-group">
            <label>Alias/Nombre</label>
            <input v-model="newCard.alias" required placeholder="Ej: Tarjeta Principal">
          </div>
          
          <div class="form-group">
            <label>Número de Tarjeta</label>
            <input v-model="newCard.number" required placeholder="1234 5678 9012 3456">
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Fecha de Expiración (MM/AA)</label>
              <input v-model="newCard.expiry" required placeholder="MM/AA">
            </div>
            
            <div class="form-group">
              <label>CVV</label>
              <input v-model="newCard.cvv" required placeholder="123" type="password">
            </div>
          </div>
          
          <div class="form-group">
            <label>Nombre del Titular</label>
            <input v-model="newCard.holder" required placeholder="Como aparece en la tarjeta">
          </div>
          
          <div class="form-check">
            <input type="checkbox" v-model="newCard.isDefault" id="defaultCard">
            <label for="defaultCard">Establecer como tarjeta predeterminada</label>
          </div>
          
          <button type="submit" class="btn btn-primary">Guardar Tarjeta</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const savedCards = ref([]);
const loading = ref(true);
const newCard = ref({
  alias: '',
  number: '',
  expiry: '',
  cvv: '',
  holder: '',
  isDefault: false
});

onMounted(async () => {
  await fetchSavedCards();
});

async function fetchSavedCards() {
  try {
    const response = await axios.get('https://localhost:3000/api/payment-methods', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    savedCards.value = response.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    alert('Error al cargar las tarjetas guardadas');
  } finally {
    loading.value = false;
  }
}

// Guardar nueva tarjeta
async function saveNewCard() {
  try {
    // Validación básica
    if (!newCard.value.alias || !newCard.value.number || !newCard.value.expiry || !newCard.value.cvv || !newCard.value.holder) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const response = await axios.post('s//localhost:3000/api/payment-methods', {
      cardNumber: newCard.value.number.replace(/\s/g, ''),
      expiryDate: newCard.value.expiry,
      securityCode: newCard.value.cvv,
      alias: newCard.value.alias,
      nombreTitular: newCard.value.holder,
      isDefault: newCard.value.isDefault
    }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    console.log(response)
    // Recargar lista y resetear formulario
    await fetchSavedCards();
    newCard.value = {
      alias: '',
      number: '',
      expiry: '',
      cvv: '',
      holder: '',
      isDefault: false
    };
    
    alert('Tarjeta guardada exitosamente');
  } catch (error) {
    console.error('Error saving card:', error);
    alert(error.response?.data?.error || 'Error al guardar la tarjeta');
  }
}

// Eliminar tarjeta
async function deleteCard(cardId) {
  if (!confirm('¿Estás seguro de eliminar esta tarjeta?')) return;
  
  try {
    await axios.delete(`https://localhost:3000/api/payment-methods/${cardId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    await fetchSavedCards();
    alert('Tarjeta eliminada correctamente');
  } catch (error) {
    console.error('Error deleting card:', error);
    alert('Error al eliminar la tarjeta');
  }
}
</script>

<style scoped>
.payment-methods-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.card-list {
  margin-bottom: 30px;
}

.card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.add-card-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-check {
  margin: 15px 0;
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}
</style>
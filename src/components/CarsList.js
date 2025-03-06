import React, { useEffect, useState } from "react";
import { db, collection, getDocs, deleteDoc, doc } from "../firebase"; 
import ConfirmationModal from "./ConfirmationModal"; // Modal'ı içe aktar
import './CarsList.css'; 

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      const carsCollection = collection(db, "cars"); 
      try {
        const querySnapshot = await getDocs(carsCollection); 
        const carsList = [];
        querySnapshot.forEach((doc) => {
          carsList.push({ id: doc.id, ...doc.data() }); 
        });
        setCars(carsList); 
      } catch (error) {
        console.error("Error fetching cars data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async () => {
    if (!carToDelete) return;

    try {
      const carDoc = doc(db, "cars", carToDelete); 
      await deleteDoc(carDoc); 
      setCars(cars.filter((car) => car.id !== carToDelete)); 
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Error deleting car: ", error);
    }
  };

  const openModal = (id) => {
    setCarToDelete(id); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCarToDelete(null);
  };

  if (loading) {
    return <div className="loading-skeleton">Loading...</div>; 
  }

  return (
    <div className="cars-list">
      <h2>Araç Listesi</h2>
      
      {/* Toplam araç sayısını göster */}
      <p className="total-cars">Toplam Araç Sayısı: {cars.reduce((total, car) => total + (car.quantity || 1), 0)}</p>

      <div className="cards-container">
        {cars.map((car) => (
          <div className="card" key={car.id}>
            <img alt={car.model} src={car.imageUrl} />
            <div className="card-details">
              <h3>{car.model}</h3>
              <p><strong>Yakıt:</strong> {car.fuel}</p>
              <p><strong>Şanzıman:</strong> {car.transmission}</p>
              <p><strong>Yıl:</strong> {car.year}</p>
              <p><strong>Araç Sayısı:</strong> {car.quantity || 1}</p> {/* Eğer quantity yoksa varsayılan olarak 1 göster */}
              <button 
                className="delete-button"
                onClick={() => openModal(car.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Aracı silmek istediğinize emin misiniz?"
      />
    </div>
  );
};

export default CarsList;

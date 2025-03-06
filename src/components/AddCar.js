import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ConfirmationModal from "./ConfirmationModal";
import { notification } from 'antd';
import "./AddCar.css";

const AddCar = () => {
  const [carData, setCarData] = useState({
    fuel: "",
    imageUrl: "",
    model: "",
    transmission: "",
    year: "",
    quantity: "", 
  });

  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "cars"), {
        ...carData,
        imageUrl,
        quantity: parseInt(carData.quantity, 10),
      });

      setIsModalOpen(true);
      setCarData({
        fuel: "",
        imageUrl: "",
        model: "",
        transmission: "",
        year: "",
        quantity: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Hata: ", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    setIsModalOpen(false);
    notification.success({
      message: 'Başarılı!',
      description: 'Araç başarıyla eklendi.',
      placement: 'topRight',
      duration: 3,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-car-form">
        <h2>Yeni Araç Ekle</h2>

        <div className="form-grid">
          <div className="form-group">
            <label>Yakıt Türü</label>
            <input
              type="text"
              name="fuel"
              placeholder="Yakıt Türü"
              value={carData.fuel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Model</label>
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={carData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Şanzıman</label>
            <input
              type="text"
              name="transmission"
              placeholder="Şanzıman"
              value={carData.transmission}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Yıl</label>
            <input
              type="number"
              name="year"
              placeholder="Yıl"
              value={carData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Araç Sayısı</label>
            <input
              type="number"
              name="quantity"
              placeholder="Kaç adet var?"
              value={carData.quantity}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="form-group image-upload">
            <label>Araç Görseli</label>
            <input type="file" onChange={handleImageChange} accept="image/*" required />
          </div>
        </div>

        <button type="submit">Kaydet</button>
      </form>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        message="Araç başarıyla eklendi! Onaylıyor musunuz?"
      />
    </div>
  );
};

export default AddCar;

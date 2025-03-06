import React, { useState } from "react";
import { db, storage } from "../firebase"; // Firebase yapılandırması
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddCar = () => {
  const [carData, setCarData] = useState({
    fuel: "",
    imageUrl: "",
    model: "",
    transmission: "",
    year: "",
  });
  const [image, setImage] = useState(null);

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
        // Resmi Firebase Storage'a yükle
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        // Yüklenen dosyanın URL'sini al
        imageUrl = await getDownloadURL(imageRef);
      }

      // Firestore'a yalnızca imageUrl ekle
      await addDoc(collection(db, "cars"), {
        ...carData,
        imageUrl, // Firestore'a sadece resmin URL'sini kaydediyoruz
      });

      alert("Araç başarıyla eklendi!");
      setCarData({
        fuel: "",
        imageUrl: "",
        model: "",
        transmission: "",
        year: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Hata: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        type="text"
        name="fuel"
        placeholder="Yakıt Türü"
        value={carData.fuel}
        onChange={handleChange}
        className="block mb-2"
        required
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={carData.model}
        onChange={handleChange}
        className="block mb-2"
        required
      />
      <input
        type="text"
        name="transmission"
        placeholder="Şanzıman"
        value={carData.transmission}
        onChange={handleChange}
        className="block mb-2"
        required
      />
      <input
        type="number"
        name="year"
        placeholder="Yıl"
        value={carData.year}
        onChange={handleChange}
        className="block mb-2"
        required
      />
      <input
        type="file"
        onChange={handleImageChange}
        className="block mb-2"
        accept="image/*"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Kaydet
      </button>
    </form>
  );
};

export default AddCar;

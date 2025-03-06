import React, { useEffect, useState } from "react";
import { db, collection, getDocs, deleteDoc, doc } from "../firebase"; // Firebase Firestore modülleri
import { Row, Col, Card, Button, Skeleton } from "antd"; // Ant Design bileşenleri

const { Meta } = Card;

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      const carsCollection = collection(db, "cars"); // Firestore'daki 'cars' koleksiyonuna erişim
      try {
        const querySnapshot = await getDocs(carsCollection); // Veriyi al
        const carsList = [];
        querySnapshot.forEach((doc) => {
          carsList.push({ id: doc.id, ...doc.data() }); // Veriyi diziye ekle
        });
        setCars(carsList); // cars state'ini güncelle
      } catch (error) {
        console.error("Error fetching cars data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      const carDoc = doc(db, "cars", id); // Silinecek araba belgesini al
      await deleteDoc(carDoc); // Belgeyi sil
      setCars(cars.filter((car) => car.id !== id)); // Silinen arabayı listeden çıkar
    } catch (error) {
      console.error("Error deleting car: ", error);
    }
  };

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <div>
      <h2>Cars List</h2>
      <Row gutter={[16, 16]}>
        {cars.map((car) => (
          <Col xs={24} sm={12} md={8} lg={6} key={car.id}>
            <Card hoverable cover={<img alt={car.model} src={car.imageUrl} />}>
              <Meta
                title={car.model}
                description={
                  <>
                    <p>
                      <strong>Fuel:</strong> {car.fuel}
                    </p>
                    <p>
                      <strong>Transmission:</strong> {car.transmission}
                    </p>
                    <p>
                      <strong>Year:</strong> {car.year}
                    </p>
                  </>
                }
              />
              <Button
                type="danger"
                style={{
                  marginTop: "10px",
                  backgroundColor: "red",
                  borderColor: "red",
                }}
                onClick={() => handleDelete(car.id)}
              >
                Delete
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CarsList;

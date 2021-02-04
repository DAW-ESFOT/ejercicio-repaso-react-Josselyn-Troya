import React, { useState } from 'react';
import {useEffect} from "react";
import { Card, Modal, Button, Row, Col, Image, Typography } from 'antd';
const { Title, Text } = Typography;


function BookCard() {

    const [books, setBooks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bookData, setBookData] = useState([]);
    const [id, setId] = useState( null );
    const [page, setPage] = useState(1);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`https://stark-spire-22280.herokuapp.com/api/books?page=${page}` );
            const json = await response.json();
            console.log("json", json);
            setBooks(json.data);
            return json;
        }

        fetchBooks();
    }, [page]);

    useEffect(() => {
        const getBookData = async () => {
                const response = await fetch( `https://stark-spire-22280.herokuapp.com/api/books/` );
                const bookJson = await response.json();
                console.log("bookJson", bookJson);
                setBookData(bookJson);
                setIsModalVisible(true);
            }
        getBookData();
    }, []);


    return(
        <>
            <Row gutter={[16, 16]}>

                {books.map((book) => (

                <Col className="gutter-row" span={8}>
                    <Card>
                        <Row>
                            <Col>
                                <Image
                                    width={150}
                                    src={book.back_cover}
                                />
                            </Col>
                            <Col span={12}>
                                    <Title level={5}>{book.title}</Title>
                                    <Text>{book.author} - {book.year_edition}</Text>
                                    <p>Precio: ${book.price}</p>
                            </Col>
                            <Col span={12}>
                                <Button type="primary" onClick={showModal}>
                                    Ver Más
                                </Button>
                            </Col>
                        </Row>
                    </Card>

                </Col>
                ))}

            </Row>


            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{display: 'flex'}}>
                    <Col className = "gutter-row" span={12}>
                        <div>
                            <h3 style={{fontWeight: 'bold'}}>{bookData.title}</h3>
                            <h4>{bookData.author} - {bookData.year_edition}</h4>
                            <h4><strong>Precio:</strong> ${bookData.price}</h4>
                            <p>{bookData.synopsis}</p>
                            <h4><strong>Disponible:</strong> {bookData.available === true ? 'Sí' : 'No'}</h4>
                            <h4><strong>Categoría:</strong> {bookData.category}</h4>
                        </div>
                    </Col>
                    <Col className = "gutter-row">
                        <div>
                            <img
                                alt={bookData.title}
                                src={bookData.cover_page}
                                style={{
                                    width: 100,
                                    height: 150,
                                    margin: 5
                                }}
                            />
                        </div>
                    </Col>
                    <Col className = "gutter-row">
                        <div>
                            <img
                                alt={bookData.title}
                                src={bookData.back_cover}
                                style={{
                                    width: 100,
                                    height: 150,
                                    margin: 5
                                }}
                            />
                        </div>
                    </Col>
                </div>
            </Modal>

        </>

    );

}
export default BookCard;
import React, { useState, useContext, useEffect } from 'react';
import styles from './Home.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import textContext from '../context/textContext';
import { useNavigate, useParams } from 'react-router-dom';

const Home = ({ defaultId = "66dff4d9d0413e66db776763" }) => {
    const { id } = useParams();
    const context = useContext(textContext);
    const { text, fetchText, createText, fetchTextbyId } = context;
    const navigate = useNavigate();

    const [text1, setText] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [showButtons, setShowButtons] = useState(true);
    const [btnanimation, setBtnanimation] = useState(false);
    const [show, setShow] = useState(false);
    const [currentId, setCurrentId] = useState(id || defaultId);

    const [formData, setFormData] = useState({ question: "", answer: "" });

    const [margleftright, setMargleftright] = useState("400px");
    const [margtopbot, setMargtopbot] = useState("140px");

    useEffect(() => {
        fetchTextbyId(currentId);
    }, [currentId, fetchTextbyId])

    useEffect(() => {
        setQuestion(text.question);
    }, [text]);

    const generateRandomNumber = () => {
        const newMargTop = Math.floor(Math.random() * 601) - 250;
        const newMargLeftRight = Math.floor(Math.random() * 1401) - 500;

        setMargtopbot(`${newMargTop}px`);
        setMargleftright(`${newMargLeftRight}px`);
    };

    const handleYes = () => {
        setText(!text1);
        setAnswer(text.answer)
        setShowButtons(false);
        setBtnanimation(true);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = async () => {
        try {
            const newId = await createText(formData.question, formData.answer);

            setCurrentId(newId);
            navigate(`/${newId}`);

            setShow(false)
        } catch (error) {
            console.error('Error saving text:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <div className='container'>
            <div className={styles.settingsbtn} onClick={handleShow}>
                <img style={{ height: "30px", width: "30px", display: "flex", justifyContent: "center", alignItems: "center" }} src="/assets/settings.png" className="d-block" alt="alt1" />
            </div>

            <div className={!btnanimation ? styles.maincontainer : styles.maincontainer2} style={{}}>
                <div>
                    <p className={styles.question}>{!text1 ? question : answer}</p>
                </div>

                <div className={styles.btncontainer}>
                    {showButtons && <div className={styles.buttons}>
                        <button className={styles.yesbtn} onClick={handleYes}>
                            <span>Yes</span>
                        </button>
                    </div>}

                    {showButtons && <button
                        className={styles.nobtn}
                        style={{ margin: `${margtopbot} ${margleftright}` }}
                        onMouseEnter={generateRandomNumber}
                        onClick={generateRandomNumber}
                    >
                        <span>No</span>
                    </button>}
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Your Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                name='question'
                                value={formData.question}
                                onChange={handleChange}
                                maxLength={40}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                type="text"
                                name='answer'
                                value={formData.answer}
                                onChange={handleChange}
                                maxLength={80}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home
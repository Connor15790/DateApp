import React, { useState, useEffect } from 'react';
import axios from 'axios';
import textContext from './textContext';

const TextState = (props) => {
    // const host = "http://localhost:5000";
    const host = "https://dateapp-c6dx.onrender.com";
    const textInitial = [""];

    const [text, setText] = useState(textInitial);

    const fetchText = async () => {
        try {
            const response = await axios.get(`${host}/text/gettext`);
            setText(response.data);
        } catch (error) {
            console.error('Error fetching text:', error);
        }
    };

    const fetchTextbyId = async (id) => {
        try {
            const response = await axios.post(`${host}/text/gettextbyid/${id}`);
            setText(response.data);
        } catch (error) {
            console.error('Error fetching text:', error);
        }
    }

    const createText = async (question, answer) => {
        try {
            const response = await axios.post(`${host}/text/createtext`, {
                question: question,
                answer: answer
            });
            
            const newId = response.data._id
            console.log("Text created successfully:", newId);

            return newId;
        } catch (error) {
            console.error('Error creating text:', error);
        }
    }

    return (
        <textContext.Provider value={{ text, fetchText, createText, fetchTextbyId }}>
            {props.children}
        </textContext.Provider>
    );
};

export default TextState;

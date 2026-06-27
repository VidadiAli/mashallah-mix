import React, { useEffect, useState } from "react";

import {
    FaCompactDisc,
    FaPlus,
    FaPen,
    FaCheck,
    FaTimes
} from "react-icons/fa";

import "./Remix.css";
import api from "../../../scripts/api";

const Remix = () => {

    const [remixes, setRemixes] = useState([]);

    const [showCreate, setShowCreate] = useState(false);

    const [newName, setNewName] = useState("");

    const [editing, setEditing] = useState(null);

    const [editName, setEditName] = useState("");



    const getRemixes = async () => {

        try {

            const res = await api.get("/admin/getRemixes");

            setRemixes(res.data.data || []);

        } catch (err) {

            console.log(err);

        }

    };



    const createRemix = async () => {

        try {

            await api.post("/admin/createRemix", {
                name: newName
            });

            setNewName("");

            setShowCreate(false);

            getRemixes();

        } catch (err) {

            console.log(err);

        }

    };



    const updateRemix = async (id) => {

        try {

            await api.put(`/admin/updateRemix/${id}`, {
                name: editName
            });

            setEditing(null);

            setEditName("");

            getRemixes();

        } catch (err) {

            console.log(err);

        }

    };



    useEffect(() => {

        getRemixes();

    }, []);



    return (

        <div className="remix-page">

            <div className="remix-header">

                <div>

                    <h1>

                        <FaCompactDisc />

                        Remix Manager

                    </h1>

                    <p>

                        Create and manage your remixes

                    </p>

                </div>

                <button
                    className="new-remix-btn"
                    onClick={() => setShowCreate(true)}
                >

                    <FaPlus />

                    New Remix

                </button>

            </div>



            <div className="remix-grid">

                {

                    remixes.map(remix => (

                        <div
                            className="remix-card"
                            key={remix._id}
                        >

                            {

                                editing === remix._id ?

                                    <>

                                        <input

                                            className="remix-input"

                                            value={editName}

                                            onChange={(e) =>
                                                setEditName(e.target.value)
                                            }

                                        />

                                        <div className="remix-actions">

                                            <button

                                                className="cancel-btn"

                                                onClick={() => {

                                                    setEditing(null);

                                                    setEditName("");

                                                }}

                                            >

                                                <FaTimes />

                                                Cancel

                                            </button>

                                            <button

                                                className="save-btn"

                                                onClick={() =>
                                                    updateRemix(remix._id)
                                                }

                                            >

                                                <FaCheck />

                                                Save

                                            </button>

                                        </div>

                                    </>

                                    :

                                    <>

                                        <div className="remix-icon">

                                            <FaCompactDisc />

                                        </div>

                                        <h3>

                                            {remix.name}

                                        </h3>

                                        <button

                                            className="remix-edit-btn"

                                            onClick={() => {

                                                setEditing(remix._id);

                                                setEditName(remix.name);

                                            }}

                                        >

                                            <FaPen />

                                        </button>

                                    </>

                            }

                        </div>

                    ))

                }

            </div>



            {

                showCreate &&

                <div className="remix-modal">

                    <div className="remix-modal-box">

                        <h2>

                            Create Remix

                        </h2>

                        <input

                            placeholder="Remix name..."

                            value={newName}

                            onChange={(e) =>
                                setNewName(e.target.value)
                            }

                        />

                        <div className="remix-actions">

                            <button

                                className="cancel-btn"

                                onClick={() => {

                                    setShowCreate(false);

                                    setNewName("");

                                }}

                            >

                                Cancel

                            </button>

                            <button

                                className="save-btn"

                                onClick={createRemix}

                            >

                                Create

                            </button>

                        </div>

                    </div>

                </div>

            }

        </div>

    );

};

export default Remix;
import {
    FaHome,
    FaMicrophone,
    FaListUl,
    FaHeart
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { language } from "../../../scripts/language";
import '../css/Menu.css'
import { useEffect, useState } from "react";


const List = ({
    lang, playList, setPlayList,
    dummyData, setDummyData,
    showArtistsBox,
    setShowArtistsBox,
    playListPages,
    innerWidth
}) => {

    const myLikedsMusics = () => {

        moveMenu();

        const likedsMusics = localStorage.getItem('likedsMusics') ?
            JSON.parse(localStorage.getItem('likedsMusics')) : [];
        if (likedsMusics.length > 0) {
            setPlayList(likedsMusics);
        }
        setDummyData(likedsMusics);
        setShowArtistsBox(null);
        playListPages?.setCurrentPlayList('likeds');
    }

    useEffect(() => {
        if (window.location.href.includes('/likeds')) myLikedsMusics();
    }, []);


    const moveMenu = () => {
        if (innerWidth > 1000) return;

        const menu = document.querySelector('.menu');
        if (!menu) return;
        menu.classList.toggle('menu-move')
    }

    return (
        <div className="menu-list">

            <ul>

                <li>
                    <NavLink to="/" onClick={
                        () => {
                            if (window.location.href !== 'http://localhost:5173/') {
                                setDummyData([]);
                                setPlayList([]);
                            }
                            setShowArtistsBox(null);
                            moveMenu();
                        }
                    }>
                        <FaHome />
                        <span>
                            {language?.[lang].menu.dashboard}
                        </span>
                    </NavLink>
                </li>

                <li onClick={() => {
                    setShowArtistsBox('artists');
                    moveMenu();
                }}>
                    <NavLink to={'/artists'}>
                        <FaMicrophone />
                        <span>
                            {language?.[lang].menu.artists}
                        </span>
                    </NavLink>
                </li>

                <li onClick={() => {
                    setShowArtistsBox('my-lists');
                    moveMenu();
                }}>
                    <NavLink to="/my-lists">
                        <FaListUl />
                        <span>
                            {language?.[lang].menu.myLists}
                        </span>
                    </NavLink>
                </li>

                <li onClick={myLikedsMusics}>
                    <NavLink to="/likeds">
                        <FaHeart />
                        <span>
                            {language?.[lang].menu.likeds}
                        </span>
                    </NavLink>
                </li>

            </ul>
        </div>
    );
};

export default List;
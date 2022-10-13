import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import css from "../css/HomePage.module.css";

import { resultAdded } from "./resultSlice";

import { getResult } from "./resultSlice";


const HomePage = () => {

    const [searchInput, setSearchInput] = useState('');
    const onSearchInputChanged = e => setSearchInput(e.target.value);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toNextPage = useCallback(() => navigate('/repositories', { replace: true }), [navigate]);

    const handleSearch = () => {
        dispatch(getResult({ text: searchInput, page: 1 }));
        dispatch(resultAdded(searchInput));
        toNextPage();
    };


    return (
        <main className={css.homepage}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <header className={css.header}>
                <a href="https://github.com/renatokirin/github-repository-search" className={css.header__link}>Source code</a>
            </header>

            <section className={css.box}>
                <h4 className={css.title}>
                    GitHub Repository Search
                </h4>

                <section className={css.search_form}>

                    <div className={css.search_form__wrapper}>
                        <input type="text" className={css.search_form__input} placeholder="Search" value={searchInput} onChange={onSearchInputChanged} />
                        <button className={css.search_form__btn} onClick={() => handleSearch()}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>

                    <div className={css.search_form__info}>
                        Built with <a href="https://reactjs.org/">React</a> & <a href="https://react-redux.js.org/">Redux</a>
                    </div>

                </section>
            </section>

        </main>
    );
};

export default HomePage;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResult } from "./resultSlice";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";
import css from "../css/RepositoriesPage.module.css";
import Pagination from "./pagination/Pagination";

const RepositoriesPage = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const [searchInput, setSearchInput] = useState('');
    const onSearchInputChanged = e => setSearchInput(e.target.value);

    const dispatch = useDispatch();
    const repos = useSelector((state) => state.result.content);

    const firstSearchInput = useSelector((state) => state.result.searchInput);

    const handleSearch = () => {
        dispatch(getResult({ text: searchInput, page: currentPage }));
    };

    const [firstLoad, setFirstLoad] = useState(true);


    useEffect(() => {
        if (!firstLoad) handleSearch();
        // eslint-disable-next-line
    }, [currentPage]);

    useEffect(() => {
        setFirstLoad(false);
        setSearchInput(firstSearchInput);
        console.log(firstSearchInput);
    }, [])


    let listRepos;

    loadRepos();

    function loadRepos() {

        try {
            listRepos = repos.length !== 0 ? repos.map((item) =>

                <ListItem key={item.id} repo={item} />

            ) : <div className={css.no_repos_found}>No repos found</div>;
        } catch (err) {
            console.log(err);
            listRepos = <div className={css.no_repos_found}>No repos found</div>;
        }
    }





    return (
        <main className={css.repos_page}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

            <header className={css.header}>
                <Link to={`/`} className={css.home}><i class="fa-solid fa-house"></i></Link>
                <section className={css.search_form}>
                    <input type="text" className={css.search_form__input} placeholder="Search repositories" value={searchInput} onChange={onSearchInputChanged} />
                    <button className={css.search_form__btn} onClick={() => handleSearch()}>
                        Search
                    </button>
                </section>
                <div className={css.empty}></div>
            </header>

            <div className={css.repositories}>
                {listRepos}
            </div>

            <div className="pagination">
                <Pagination
                    currentPage={currentPage}
                    total={500}
                    limit={28}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>

        </main>
    );
};

export default RepositoriesPage;
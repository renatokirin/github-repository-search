import { Link } from "react-router-dom";
import css from "../css/RepositoriesPage.module.css";

const ListItem = ({ repo }) => {


    const listTopics = (topics) => topics.map((item) =>
        <a href={"https://github.com/topics/" + item} className={css.repository__topic}>{item}</a>
    );

    return (
        <>
            <article className={css.repository}>

                <div className={css.repository__name}>
                    <Link to={`/repositories/${repo.id}`}>{repo.full_name}</Link>
                </div>

                <div className={css.repository__description}>
                    {repo.description}
                </div>

                <div className={css.repository__topics}>
                    {listTopics(repo.topics)}
                </div>

                <div className={css.repository__details}>
                    <div className={css.stargazers}>
                        <i class="fa-regular fa-star"></i>
                        {repo.stargazers_count}
                    </div>
                    <div>
                        {repo.language}
                    </div>
                    {(repo.license) ?
                        <div className={css.repository__detail}>
                            <i className="fa-solid fa-scale-balanced"></i> {repo.license.name}
                        </div> : <div></div>
                    }

                </div>

            </article>
        </>
    );
};

export default ListItem;
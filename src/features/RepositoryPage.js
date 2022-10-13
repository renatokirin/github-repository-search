import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectRepoById } from "./resultSlice";
import { Link } from "react-router-dom";
import css from "../css/RepositoryPage.module.css";


const RepositoryPage = () => {

    const [languages, setLanguages] = useState();
    const [otherLanguages, setOtherLanguages] = useState(0);

    const [contributors, setContributors] = useState();

    const { repoId } = useParams();

    const repo = useSelector((state) => selectRepoById(state, Number(repoId)));

    useEffect(() => {
        getLanguages();
        getContributors();
    }, []);



    const listTopics = (topics) => topics.length !== 0 ? topics.map((item) =>
        <a href={"https://github.com/topics/" + item} className={css.repository__topic}>{item}</a>
    ) : <div></div>



    const langColorDictionary = new Map(
        [
            ['typescript', '#3178c6'],
            ['javascript', '#f1e05a'],
            ['coffeescript', '#244776'],
            ['html', '#e34c26'],
            ['css', '#563d7c'],
            ['scss', '#c6538c'],
            ['c++', '#f34b7d'],
            ['c', '#555555'],
            ['swift', '#f05138'],
            ['python', '#3572a5'],
            ['shell', '#89e051'],
            ['java', '#b07219'],
            ['kotlin', '#a97bff'],
            ['c#', '#178600'],
            ['go', '#00add8'],
            ['php', '#4f5d95'],
        ]
    );


    const languageColor = (language) => {
        const color = langColorDictionary.get(language.toLowerCase());

        if (color == null) return '#d8dee4'; // default

        return color;
    };


    const getLanguages = async () => fetch(repo.languages_url).then((res) => res.json()).then(data => {

        const values = Object.values(data);
        const keys = Object.keys(data);

        function getPercentage(value) {
            let sum = 0;
            values.forEach(value => {
                sum += value;
            });
            return (value / sum) * 100;
        }

        const percentValues = values.map(getPercentage);


        let j = -1;
        setLanguages(keys.length !== 0 ? keys.map((key) => {
            j++;
            if (percentValues[j] > 1) {

                return <div className={css.repository__language} style={{ backgroundColor: `${languageColor(key)}` }}>
                    <span>{key}</span>
                    <div>{percentValues[j].toFixed(1)}%</div>
                </div>

            } else {
                setOtherLanguages(currValue => currValue + percentValues[j]);
            }

        }) : <div>Empty</div>);


    }).catch((err) => console.log(err));


    const getContributors = async () => fetch(repo.contributors_url).then((res) => res.json()).then(data => {

        let j = 0;
        setContributors(data.length !== 0 ? data.map((contributor) => {
            j++;
            if (j <= 10) {
                return <div className={css.contributor}>
                    <a href={contributor.html_url}>
                        <img src={contributor.avatar_url} alt="" />
                    </a>
                </div>
            }
        }) : <div>Empty</div>);

    });

    const getFormattedDate = (date) => {
        try {
            const newDate = new Date(date);
            return ((newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear());
        } catch (err) {
            console.log(err);
        }

    };

    return (
        <main className={css.repository}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <div className={css.repository__container}>

                <div className={css.repository__title}>
                    <Link to={`/repositories/`} className={css.link}><i class="fa-solid fa-arrow-left"></i></Link>
                    <div>{repo.full_name}</div>
                    <div className={css.empty}></div>
                </div>

                <div className={css.repository__about}>
                    <h4 className={css.h4}>About</h4>

                    <div className={css.repository__description}>
                        {repo.description ? repo.description : <i>No description provided.</i>}
                    </div>

                    <div className={css.repository__topics}>
                        {listTopics(repo.topics)}
                    </div>

                </div>

                <div className={css.repository__details}>
                    <h4 className={css.h4}>Details</h4>

                    <div className={css.details_container}>

                        {(repo.homepage) ?
                            <div className={css.repository__detail}>
                                <i className="fa-solid fa-link"></i><a href={repo.homepage}>Homepage</a>
                            </div> : null
                        }


                        <div className={css.repository__detail}>
                            <i className="fa-solid fa-calendar-days"></i> Created at <span>{getFormattedDate(repo.created_at)}</span>
                        </div>


                        {(repo.license) ?
                            <div className={css.repository__detail}>
                                <i className="fa-solid fa-scale-balanced"></i> {repo.license.name}
                            </div> : null
                        }



                        <div className={css.repository__detail}>
                            <i className="fa-regular fa-star"></i> <span>{repo.stargazers_count}</span> stars
                        </div>

                        <div className={css.repository__detail}>
                            <i className="fa-solid fa-code-fork"></i> <span>{repo.forks}</span> forks
                        </div>


                        <div className={css.repository__detail}>
                            <i className="fa-solid fa-circle-dot"></i> <span>{repo.open_issues}</span> open issues
                        </div>


                    </div>


                </div>

                <div className={css.repository__contributors}>
                    <h4 className={css.h4}>Contributors</h4>

                    <div className={css.contributors_container}>
                        {contributors}
                    </div>

                </div>

                <div className={css.repository__languages}>
                    <h4 class={css.h4}>Languages</h4>

                    <div className={css.languages_container}>
                        {languages}

                        {
                            (otherLanguages > 0.1) ?
                                <div className={css.repository__language} style={{ backgroundColor: "#d8dee4" }}>
                                    <span>Other</span>
                                    <div>{otherLanguages.toFixed(1)}%</div>
                                </div> : <div></div>
                        }


                    </div>

                </div>



            </div>

        </main>
    );
};

export default RepositoryPage;







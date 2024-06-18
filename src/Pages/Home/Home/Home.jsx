
import { useEffect, useState } from "react";


const Home = () => {
    const [contest, setContest] = useState([]);
    useEffect(() => {
        fetch('https://codeforces.com/api/contest.list')
            .then(res => res.json())
            .then(data => {
                const before = data.result.filter(item => item.phase === 'BEFORE');
                setContest(before);
            })
    }, [])
    console.log(contest);
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
};

export default Home;
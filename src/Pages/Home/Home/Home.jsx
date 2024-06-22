
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";


const Home = () => {
    // const [contest, setContest] = useState([]);
    // useEffect(() => {
    //     fetch('https://codeforces.com/api/contest.list')
    //         .then(res => res.json())
    //         .then(data => {
    //             const before = data.result.filter(item => item.phase === 'BEFORE');
    //             setContest(before);
    //         })
    // }, [])
    // console.log(contest);
    return (
        <div className="h-[100vh]">
            <h1 className="text-xl text-center mt-28 uppercase">Coming Soon</h1>
        </div>
    );
};

export default Home;
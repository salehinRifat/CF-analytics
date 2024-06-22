import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
const Analytics = () => {
    var problems = {};
    var verdicts = {};
    var langs = {};
    var tags = {};
    var levels = {};
    var ratings = {};
    const [contest, setContest] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setloading] = useState(true);
    const handleSubmit = e => {
        e.preventDefault();
        const handle = e.target.handle.value;
        console.log(handle)
        axios.get(`https://codeforces.com/api/user.status?handle=${handle}`)
            .then(res => {
                setContest(res.data.result)
            })
    }

    for (var i = contest.length - 1; i >= 0; i--) {
        var sub = contest[i];

        // creating unique key for problem {contestID + problem name + problem rating}
        var rating;
        if (sub.problem.rating === undefined) {
            rating = 0;
        } else {
            rating = sub.problem.rating;
        }
        var problemId = sub.problem.contestId + '-' + sub.problem.name + '-' + rating;

        // previous id for removing duplicates
        var problemIdprev = sub.problem.contestId - 1 + '-' + sub.problem.name + '-' + rating;

        // next id for removing duplicates
        var problemIdnext = sub.problem.contestId + 1 + '-' + sub.problem.name + '-' + rating;
        // checking if problem previously visited
        if (problems[problemIdprev] !== undefined) {
            if (problems[problemIdprev].solved === 0) {
                problems[problemIdprev].attempts++;
            }
            problemId = problemIdprev;
        } else if (problems[problemIdnext] !== undefined) {
            if (problems[problemIdnext].solved === 0) {
                problems[problemIdnext].attempts++;
            }
            problemId = problemIdnext;
        } else if (problems[problemId] !== undefined) {
            if (problems[problemId].solved === 0) {
                problems[problemId].attempts++;
            }
        } else {
            problems[problemId] = {
                problemlink: sub.contestId + '-' + sub.problem.index, // link of problem
                attempts: 1,
                solved: 0 // We also want to save how many submission got AC, a better name would have been number_of_ac
            };
        }
        if (sub.verdict == 'OK') {
            problems[problemId].solved++;
        }
        // modifying level, rating, and tag counter on first AC.
        if (problems[problemId].solved === 1 && sub.verdict == 'OK') {
            sub.problem.tags.forEach(function (t) {
                if (tags[t] === undefined) tags[t] = 1;
                else tags[t]++;
            });

            if (levels[sub.problem.index[0]] === undefined)
                levels[sub.problem.index[0]] = 1;
            else levels[sub.problem.index[0]]++;

            if (sub.problem.rating) {
                if (ratings[sub.problem.rating] === undefined) {
                    ratings[sub.problem.rating] = 1;
                } else {
                    ratings[sub.problem.rating]++;
                }
            }
        }

        // changing counter of verdict submission
        if (verdicts[sub.verdict] === undefined) verdicts[sub.verdict] = 1;
        else verdicts[sub.verdict]++;

        // changing counter of launguage submission
        if (langs[sub.programmingLanguage] === undefined)
            langs[sub.programmingLanguage] = 1;
        else langs[sub.programmingLanguage]++;

    }
    console.log(levels);
    const levelOptions = {
        title: "Problem levels",
        legend: "none"
    };
    const ratingOptions = {
        title: "Problem Ratings",
        legend: "none"
    };
    const data = [
        ["Level", "Solved", { role: "style" }],
    ];

    Object.keys(levels).forEach(key => {
        const value = levels[key];
        // Create an array for each key-value pair
        data.push([key, value, "color: #3366CC"]); // You can customize the style here
    });

    const data2 = [
        ["Rating", "Solved", { role: "style" }],
    ];

    Object.keys(ratings).forEach(rating => {
        const value = ratings[rating];
        // Create an array for each key-value pair
        data2.push([rating, value, "color: #e5e4e2"]); // You can customize the style here
    });

    // Creating Pie Chart for problem tags
    const pieData = [
        ["Tags", "Solved"],
    ];
    const pieOptions = {
        title: "Tags Solved",
        pieSliceText: "none",
        is3D: "true"
    };
    Object.keys(tags).forEach(tag => {
        const value = tags[tag];
        pieData.push([`${tag}: ${value}`, value]);
    })
    return (
        <div className="max-w-screen-lg mx-auto">
            <section className="flex justify-center">
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-5 justify-center items-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Codeforces Handle</span>
                            </div>
                            <input type="text" name="handle" placeholder="Enter Handle" className="input input-bordered w-full max-w-xs" />

                        </label>
                        <input type="submit" className="btn btn-outline mt-9" />
                    </div>
                </form>
            </section>
            <section className="mt-5">
                <div className="border-2 border-slate-400 m-1">
                    <Chart chartType="ColumnChart" width="100%" height="400px" data={data} options={levelOptions} className="pt-0" />
                </div>
                <div className="border-2 border-slate-400 m-1">
                    <Chart chartType="ColumnChart" width="100%" height="400px" data={data2} options={ratingOptions} />
                </div>
                <div className="border-2 border-slate-400 m-1">
                    <Chart chartType="PieChart" width="100%" height="400px" data={pieData} options={pieOptions} />
                </div>
            </section>
        </div>
    );
};

export default Analytics;
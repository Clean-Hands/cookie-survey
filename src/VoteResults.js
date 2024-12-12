import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Confetti from 'react-confetti'
import { firebaseFirestore } from './index';


const VoteResults = () => {
	const user = useSelector(state => state.auth.user);
	const [chocPBBallsResults, setChocPBBallsResults] = useState('????');
	const [chocPepCookiesResults, setChocPepCookiesResults] = useState('????');
	const [xmasCutoutsResults, setXmasCutoutsResults] = useState('????');
	const [ruTeacakesResults, setRuTeacakesResults] = useState('????');
	const [turtleResults, setTurtleResults] = useState('????');
	const [whiteChocPretzelsResults, setWhiteChocPretzelsResults] = useState('????');
	const [error, setError] = useState('');

  	useEffect(() => {
		
		const getResults = async () => {

			const responses = collection(firebaseFirestore, "/surveys/2024/responses")
			const choiceOptions = ["firstChoice", "secondChoice", "thirdChoice", "fourthChoice", "fifthChoice"]

			const calculateResults = async (optionName) => {
				try {
					let sum = 0;
					for (let i = 0; i < choiceOptions.length; i++) {
						const q = query(responses, where(choiceOptions[i], "==", optionName));
						const snapshot = await getDocs(q);
						sum += (snapshot.size * (5-i));
					}
					return sum;
				} catch (error) {
					setError('Could not fetch data: ' + error.message);
				}
			};
			
			setChocPBBallsResults(await calculateResults("chocPBBalls"));
			setChocPepCookiesResults(await calculateResults("chocPepCookies"));
			setXmasCutoutsResults(await calculateResults("xmasCutouts"));
			setRuTeacakesResults(await calculateResults("ruTeacakes"));
			setTurtleResults(await calculateResults("turtles"));
			setWhiteChocPretzelsResults(await calculateResults("whiteChocPretzels"));

		}

		if (user) {
			getResults();
		}
  	}, [user]);

  	if (!user) {
    	return <Navigate to="/login"/>;
  	}

	const resultsData = [
		{ name: "Chocolate Peanut Butter Balls", value: chocPBBallsResults },
		{ name: "Chocolate Peppermint Cookies", value: chocPepCookiesResults },
		{ name: "Christmas Cutouts", value: xmasCutoutsResults },
		{ name: "Russian Teacakes", value: ruTeacakesResults },
		{ name: "Turtles", value: turtleResults },
		{ name: "White Chocolate Pretzels", value: whiteChocPretzelsResults }
	];

	const maxValue = 30;

  	return (
    	<div class="main-content">
			<h1>Results</h1>
			<h3>The 2024 Christmas Cookie Survey is complete!</h3>
			
			<h4>Drumroll please...</h4>
			{error && <div style={{ color: 'red' }}>{error}</div>}

			<div style={{
				marginTop: '20px',
				display: 'flex',
				flexDirection: 'column',
				gap: '8px'
        	}}>
				{resultsData.map(({ name, value }) => (
					<div 
						key={name}
						style={{
							background: '#224012',
							width: `${((value / maxValue) * 74) + 26}%`,
							minWidth: '26%',
							borderRadius: '8px'
						}}
					>
						<span style={{
							color: "#FCFFF0",
							display: 'inline-block',
							padding: '4px 8px'
						}}>
							{name}: {value}
						</span>
					</div>
				))}
			</div>

			<h4>Score Calculation:</h4>
			<ul>
				<li>Ranked first: <b>+5</b> points.</li>
				<li>Ranked second: <b>+4</b> points.</li>
				<li>Ranked third: <b>+3</b> points.</li>
				<li>Ranked fourth: <b>+2</b> points.</li>
				<li>Ranked fifth: <b>+1</b> point.</li>
				<li>Ranked sixth: <b>+0</b> points.</li>
			</ul>
			
      		<hr/>
      		<Link tabindex="-1" to="/">
				<button>Home</button>
			</Link>

			<Confetti
				confettiSource={{x: window.innerWidth/2, y: window.innerHeight, w: 0}}
				width={window.innerWidth}
				height={window.innerHeight}
				numberOfPieces={400}
				tweenDuration={100}
				recycle={false}
				opacity={0.8}
				initialVelocityY={25}
				initialVelocityX={15}
				gravity={0.15}
				colors={['#941C2F', '#224012']}
			/>
    	</div>
  	);
};

export default VoteResults;
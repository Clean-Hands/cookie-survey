import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import Confetti from 'react-confetti'
import { firebaseFirestore } from './index';


const VoteSuccess = () => {
	const user = useSelector(state => state.auth.user);
	const [firstChoice, setFirstChoice] = useState('');
	const [secondChoice, setSecondChoice] = useState('');
	const [thirdChoice, setThirdChoice] = useState('');
	const [fourthChoice, setFourthChoice] = useState('');
	const [fifthChoice, setFifthChoice] = useState('');
	const [sixthChoice, setSixthChoice] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');


  	useEffect(() => {
		const resetChoices = async () => {
			try {
				const userDoc = await getDoc(doc(firebaseFirestore, 'surveys/2024/responses', user.uid));
				
				if (userDoc.exists()) {
					setFirstChoice(userDoc.data().firstChoice  || '');
					setSecondChoice(userDoc.data().secondChoice  || '');
					setThirdChoice(userDoc.data().thirdChoice  || '');
					setFourthChoice(userDoc.data().fourthChoice  || '');
					setFifthChoice(userDoc.data().fifthChoice  || '');
					setSixthChoice(userDoc.data().sixthChoice  || '');
				};
			} catch (error) {
				setError('Could not fetch user profile: ' + error.message);
				setSuccess('')
			}
		};

		if (user) {
			resetChoices();
		}
  	}, [user]);


	const getFullName = (cookieID) => {
		switch (cookieID) {
			case "xmasCutouts":
				return "Christmas Cutouts";
			case "ruTeacakes":
				return "Russian Teacakes";
			case "chocPBBalls":
				return "Chocolate Peanut Butter Balls";
			case "turtles":
				return "Turtles";
			case "whiteChocPretzels":
				return "White Chocolate Pretzels";
			case "chocPepCookies":
				return "Chocolate Peppermint Cookies";
			default:
				break;
		}
	}


  	if (!user) {
    	return <Navigate to="/login"/>;
  	}


  	return (
    	<div class="main-content">
			<h1>Success!</h1>
			<h3>Your cookie rankings have successfully been submitted. Thanks for voting!</h3>
			
			<h4>Here's what we recieved:</h4>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			{success && <div style={{ color: 'green' }}>{success}</div>}
			<ol>
				<li>{getFullName(firstChoice)}</li>
				<li>{getFullName(secondChoice)}</li>
				<li>{getFullName(thirdChoice)}</li>
				<li>{getFullName(fourthChoice)}</li>
				<li>{getFullName(fifthChoice)}</li>
				<li>{getFullName(sixthChoice)}</li>
      		</ol>
			<Link tabindex="-1" to="/vote">
				<button>Edit My Rankings</button>
			</Link>

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

export default VoteSuccess;
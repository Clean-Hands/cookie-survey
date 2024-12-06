import React, { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseFirestore } from './index';


const Vote2024 = () => {
	const user = useSelector(state => state.auth.user);
	const [profileData, setProfileData] = useState({
		username: '',
		email: '',
	});
	const [newFirstChoice, setFirstChoice] = useState('');
	const [newSecondChoice, setSecondChoice] = useState('');
	const [newThirdChoice, setThirdChoice] = useState('');
	const [newFourthChoice, setFourthChoice] = useState('');
	const [newFifthChoice, setFifthChoice] = useState('');
	const [newSixthChoice, setSixthChoice] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const resetChoices = useCallback(async () => {
		try {
			const userDoc = await getDoc(doc(firebaseFirestore, 'surveys/2024/responses', user.uid));
			
			if (userDoc.exists()) {
				setFirstChoice(userDoc.data().firstChoice  || '');
				setSecondChoice(userDoc.data().secondChoice  || '');
				setThirdChoice(userDoc.data().thirdChoice  || '');
				setFourthChoice(userDoc.data().fourthChoice  || '');
				setFifthChoice(userDoc.data().fifthChoice  || '');
				setSixthChoice(userDoc.data().sixthChoice  || '');
				// setSuccess('Loaded previous response.')
			};
		} catch (error) {
			setError('Could not fetch user profile: ' + error.message);
			setSuccess('')
		}
  	}, [user]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(firebaseFirestore, 'users', user.uid));
          
          if (userDoc.exists()) {
            setProfileData({
              username: userDoc.data().username || '',
              email: user.email || '',
            });
          }
        } catch (error) {
          setError('Could not fetch user profile: ' + error.message);
          setSuccess('')
        }
      }
    };

	if (user) {
		resetChoices(); // Direct call
		fetchUserProfile();
	}
  }, [user, resetChoices]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setError('');
    setSuccess('');
    switch (name) {
		case 'newFirstChoice':
			setFirstChoice(value);
			break;
		case 'newSecondChoice':
			setSecondChoice(value);
			break;
		case 'newThirdChoice':
			setThirdChoice(value);
			break;
		case 'newFourthChoice':
			setFourthChoice(value);
			break;
		case 'newFifthChoice':
			setFifthChoice(value);
			break;
		case 'newSixthChoice':
			setSixthChoice(value);
			break;
      default:
        setError('unknown event name')
    }
  };

  	const handleSubmit = async () => {

		// verify user input
		const choiceArray = [newFirstChoice, newSecondChoice, newThirdChoice, newFourthChoice, newFifthChoice, newSixthChoice]
		const choiceSet = new Set(choiceArray)
		if (choiceArray.length !== (choiceArray.filter(choice => choice !== '').length)) {
			setError('Choices may not be left blank.');
			setSuccess('')
			return;
		} else if (choiceArray.length !== choiceSet.size) {
			setError('Duplicate rankings are not allowed.');
			setSuccess('')
			return;
		}

		try {
			await setDoc(doc(firebaseFirestore, 'surveys/2024/responses', user.uid), {
				username: profileData.username, 
				email: profileData.email, 
				submitted: new Date(),
				firstChoice: newFirstChoice,
				secondChoice: newSecondChoice,
				thirdChoice: newThirdChoice,
				fourthChoice: newFourthChoice,
				fifthChoice: newFifthChoice,
				sixthChoice: newSixthChoice
			});

			resetChoices();

			setSuccess('Preferences submitted successfully!');
			setError('');
		} catch (error) {
			setError('Could not submit preferences: ' + error.message);
			setSuccess('');
		}
  	};

  	
  	if (!user) {
    	return <Navigate to="/login"/>;
  	}


  return (
    <div>
      <h2>{profileData.username}'s 2024 Cookie Rankings</h2>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
		<br/>
      <div>
        {/* <h3>Update Username</h3> */}
		<div>
			<label for="newFirstChoice">First choice: </label>
			<select name="newFirstChoice"
					id="newFirstChoice" 
					value={newFirstChoice}
					onChange={handleInputChange}
					>
				<option value="" selected disabled hidden></option>
				<option value="xmasCutouts">Christmas Cutouts</option>
				<option value="ruTeacakes">Russian Teacakes</option>
				<option value="chocPBBalls">Chocolate Peanut Butter Balls</option>
				<option value="turtles">Turtles</option>
				<option value="whiteChocPretzels">White Chocolate Pretzels</option>
				<option value="chocPepCookies">Chocolate Peppermint Cookies</option>
			</select> 
		</div>
		<br/>
		<div>
			<label for="newSecondChoice">Second choice: </label>
			<select name="newSecondChoice"
					id="newSecondChoice" 
					value={newSecondChoice}
					onChange={handleInputChange}
					placeholder="Second choice"
					required>
				<option value="" selected disabled hidden></option>
				<option value="xmasCutouts">Christmas Cutouts</option>
				<option value="ruTeacakes">Russian Teacakes</option>
				<option value="chocPBBalls">Chocolate Peanut Butter Balls</option>
				<option value="turtles">Turtles</option>
				<option value="whiteChocPretzels">White Chocolate Pretzels</option>
				<option value="chocPepCookies">Chocolate Peppermint Cookies</option>
			</select> 
		</div>
		<br/>
		<div>
			<label for="newThirdChoice">Third choice: </label>
			<select name="newThirdChoice"
					id="newThirdChoice" 
					value={newThirdChoice}
					onChange={handleInputChange}
					placeholder="Third choice">
				<option value="" selected disabled hidden></option>
				<option value="xmasCutouts">Christmas Cutouts</option>
				<option value="ruTeacakes">Russian Teacakes</option>
				<option value="chocPBBalls">Chocolate Peanut Butter Balls</option>
				<option value="turtles">Turtles</option>
				<option value="whiteChocPretzels">White Chocolate Pretzels</option>
				<option value="chocPepCookies">Chocolate Peppermint Cookies</option>
			</select> 
		</div>
		<br/>
		<div>
			<label for="newFourthChoice">Fourth choice: </label>
			<select name="newFourthChoice"
					id="newFourthChoice" 
					value={newFourthChoice}
					onChange={handleInputChange}
					placeholder="Fourth choice">
				<option value="" selected disabled hidden></option>
				<option value="xmasCutouts">Christmas Cutouts</option>
				<option value="ruTeacakes">Russian Teacakes</option>
				<option value="chocPBBalls">Chocolate Peanut Butter Balls</option>
				<option value="turtles">Turtles</option>
				<option value="whiteChocPretzels">White Chocolate Pretzels</option>
				<option value="chocPepCookies">Chocolate Peppermint Cookies</option>
			</select> 
		</div>
		<br/>
		<div>
			<label for="newFifthChoice">Fifth choice: </label>
			<select name="newFifthChoice"
					id="newFifthChoice" 
					value={newFifthChoice}
					onChange={handleInputChange}
					placeholder="Fifth choice">
				<option value="" selected disabled hidden></option>
				<option value="xmasCutouts">Christmas Cutouts</option>
				<option value="ruTeacakes">Russian Teacakes</option>
				<option value="chocPBBalls">Chocolate Peanut Butter Balls</option>
				<option value="turtles">Turtles</option>
				<option value="whiteChocPretzels">White Chocolate Pretzels</option>
				<option value="chocPepCookies">Chocolate Peppermint Cookies</option>
			</select> 
		</div>
		<br/>
		<div>
			<label for="newSixthChoice">Sixth choice: </label>
			<select name="newSixthChoice"
					id="newSixthChoice" 
					value={newSixthChoice}
					onChange={handleInputChange}
					placeholder="Sixth choice">
				<option value="" selected disabled hidden></option>
				<option value="xmasCutouts">Christmas Cutouts</option>
				<option value="ruTeacakes">Russian Teacakes</option>
				<option value="chocPBBalls">Chocolate Peanut Butter Balls</option>
				<option value="turtles">Turtles</option>
				<option value="whiteChocPretzels">White Chocolate Pretzels</option>
				<option value="chocPepCookies">Chocolate Peppermint Cookies</option>
			</select> 
		</div>
		<br/>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <hr/>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Vote2024;
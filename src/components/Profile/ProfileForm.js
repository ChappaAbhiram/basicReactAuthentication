import classes from './ProfileForm.module.css';
import {useRef,useContext} from 'react';
import AuthContext from '../../store/auth-context';
import {useHistory} from 'react-router-dom';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authctx = useContext(AuthContext);
  const history = useHistory();
  const submitformHandler = (event)=>{
    event.preventDefault();
    const enterednewPassword = newPasswordInputRef.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs",
    {
      method : 'POST',
      body : JSON.stringify({
        idToken : authctx.token,
        password : enterednewPassword,
        returnSecureToken :  false
      }),
      headers : {
        'Content-Type' : 'application.json'
      }
    }).then(res=>{
      //Assumption always succeeds
      history.replace('/');
    })
  }
  return (
    <form className={classes.form} onSubmit={submitformHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>

      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

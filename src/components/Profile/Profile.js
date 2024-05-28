import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./Profile.module.css"
import supabase from "../../client.js";
import { Auth } from '@supabase/auth-ui-react';

const Profile = () => {

    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            localStorage.setItem('signedIn', JSON.stringify(session))
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            localStorage.setItem('signedIn', JSON.stringify(session))
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (
            <div className={classes.mainWrapper}>
                <div className={classes.content}>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{
                            style: {
                                button: {
                                    background: '#0099ff',
                                    color: 'white',
                                    padding: '10px 24px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: 'Star Jedi, Arial, sans-serif',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 2px 4px rgba(0, 118, 255, 0.2)',
                                    transition: 'background-color 0.3s, color 0.3s, transform 0.3s',
                                },
                                container: {
                                    margin: '0px',
                                    fontFamily: 'Star Jedi, Arial, sans-serif',
                                    fontSize: '20px',
                                },
                                anchor: {
                                    color: '#777777',
                                    fontSize: '14px',
                                    textDecoration: 'none',
                                },
                                divider: {
                                    borderTop: '1px solid #DDD',
                                },
                                label: {
                                    fontWeight: 'bold',
                                    marginBottom: '8px',
                                },
                                input: {
                                    padding: '10px',
                                    border: '1px solid #DDD',
                                    borderRadius: '10px',
                                    fontFamily: 'Star Jedi, Arial, sans-serif',
                                    fontSize: '14px',
                                    marginBottom: '0px',
                                },
                                loader: {
                                    color: '#0070F3',
                                },
                                message: {
                                    backgroundColor: '#F9F9F9',
                                    color: '#333',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    fontFamily: 'Star Jedi, Arial, sans-serif',
                                    fontSize: '14px',
                                    marginBottom: '12px',
                                },
                            },
                        }}
                        providers={[]}
                        localization={{
                            variables: {
                                sign_up: {
                                    social_provider_text: 'Join the Rebel Alliance with {{provider}}',
                                    email_label: 'Holonet Address',
                                    password_label: 'Secret Code',
                                    email_input_placeholder: 'Your email address',
                                    password_input_placeholder: 'Your secret code',
                                    button_label: 'Enlist',
                                    loading_button_label: 'Enlisting...',
                                    link_text: 'No credentials? Enlist now!',
                                    confirmation_text: 'Check your Holonet messages',
                                },
                                sign_in: {
                                    social_provider_text: 'Sign in with {{provider}} to join the Force',
                                    email_label: 'Holonet Address',
                                    password_label: 'Secret Code',
                                    email_input_placeholder: 'Your email address',
                                    password_input_placeholder: 'Your secret code',
                                    button_label: 'Engage',
                                    loading_button_label: 'Engaging...',
                                    link_text: 'Already with the Force? Engage now!',
                                },
                                forgotten_password: {
                                    email_label: 'Holonet Address',
                                    email_input_placeholder: 'Your email address',
                                    button_label: 'Retrieve Secret Code',
                                    link_text: 'Forgot your secret code?',
                                    loading_button_label: 'Sending droids to assist...',
                                    confirmation_text: 'Check your Holonet messages',
                                },
                                update_password: {
                                    password_label: 'New Secret Code',
                                    password_input_placeholder: 'Your new secret code',
                                    button_label: 'Update Secret Code',
                                    loading_button_label: 'Updating Secret Code...',
                                    confirmation_text: 'Secret Code Updated',
                                },
                            },
                        }}
                    />


                </div>
            </div>
        )
    }
    else {
        return (
            <div className={classes.mainWrapper}>
                <button
                    className={classes.submit}
                    onClick={() => supabase.auth.signOut()}>
                    Аккаунттан шығу
                </button>
            </div>
        )
    }
}

export default Profile;
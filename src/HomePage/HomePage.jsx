import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div>
            <div className="top-para-sec">
                <div className="container">
                    <h2>Our<span>Works</span></h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
                    <div className="btn-sec">
                        <button className="button" type="button">SHOW ALL</button>
                        <button className="button gray-btn" type="button">SPLASH LIGHT - 01 (DEMO)</button>
                    </div>
                </div>
            </div>
            <div className="service-sec">
                <div className="container-fluid">
                    <div className="service-content">
                        <div className="service-title">
                            <h2>
                                WHY CHOOSE <br />
                                <span>THEGEM</span>
                            </h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="service-item">
                                    <div className="service-item-txt">
                                        <h2>LOADING OPTMIZE (DEMO)</h2>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has</p>
                                        <button className="button border-btn" type="button">LEARN MORE</button>
                                    </div>
                                    <div className="service-icon">
                                    <i class="fa fa-trophy fa-4x" style={{color:"#dc3545"}} aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="service-item">
                                    <div className="service-item-txt">
                                        <h2>LOADING OPTMIZE (DEMO)</h2>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has</p>
                                        <button className="button border-btn" type="button">LEARN MORE</button>
                                    </div>
                                    <div className="service-icon">
                                    <i class="fa fa-mobile fa-4x" style={{color:"#28a745"}} aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="service-item">
                                    <div className="service-item-txt">
                                        <h2>LOADING OPTMIZE (DEMO)</h2>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has</p>
                                        <button className="button border-btn" type="button">LEARN MORE</button>
                                    </div>
                                    <div className="service-icon">
                                    <i class="fa fa-bell fa-4x" style={{color:"#6f42c1"}} aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { HomePage };
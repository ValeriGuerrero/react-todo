import React, { useState, useEffect } from 'react'
import './App.css'

export function About() {
    return (
        <div className='about-page'>
            <h1>About</h1>
            <p>Welcome to the Book Tracker App! This app is designed for book
                lovers who want to keep track of the books they've read and rate
                them based on their personal experience.</p>
            <div>
                <h2 className='key-title'>Key Features:</h2>
                <ul className='key-list'>
                    <li>Add new books to your list</li>
                    <li>Rate each book you've read on a scale of 1 to 5</li>
                    <li>Sort books by title</li>
                </ul>
                <br></br>
                <p>Whether youre an avid reader or just getting into books,
                    this app makes it easy to organize your reading journey.</p>
            </div>
        </div>
    )
}
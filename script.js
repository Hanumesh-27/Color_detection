/* Sample Images */

.samples {
    background: white;
    padding: 25px;
    border-radius: 15px;
    margin-bottom: 25px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.samples h2 {
    text-align: center;
    margin-bottom: 20px;
}

.sample-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
}

.sample-card {
    background: #f8fafc;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: 0.3s;
}

.sample-card:hover {
    transform: translateY(-5px);
    border-color: #2563eb;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.sample-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    display: block;
}

.sample-card p {
    text-align: center;
    padding: 12px;
    font-weight: bold;
    color: #374151;
}


/* Responsive Sample Images */

@media (max-width: 850px) {

    .sample-grid {
        grid-template-columns: repeat(2, 1fr);
    }

}

@media (max-width: 500px) {

    .sample-grid {
        grid-template-columns: 1fr;
    }

}

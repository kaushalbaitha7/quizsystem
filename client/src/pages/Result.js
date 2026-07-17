<div className="result-card">

    <h1>Assessment Completed 🎉</h1>

    <h2>{result.student.name}</h2>

    <p><strong>USN :</strong> {result.student.usn}</p>

    <p><strong>College :</strong> {result.student.college}</p>

    <p><strong>Branch :</strong> {result.student.branch}</p>

    <hr />

    <h2>Score : {result.score} / {result.total}</h2>

    <h3>{result.percentage}%</h3>

    <p>Submitted Successfully ✅</p>

    {/* Learning Resources */}

    <div className="learning-section">

        <h3>Continue Your Learning</h3>

        <p>
            For more learning resources, coding practice and interview preparation,
            explore our platforms.
        </p>

        <div className="resource-links">

            <a
                href="https://eetirpltd.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
            >
                <img
                    src="/eetirp-logo.png"
                    alt="EETIRP"
                />
                <span>Visit EETIRP</span>
            </a>

            <a
                href="https://kaurahub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
            >
                <img
                    src="/kaurahub-logo.png"
                    alt="KAURAHUB"
                />
                <span>Visit KAURAHUB</span>
            </a>

        </div>

    </div>

</div>
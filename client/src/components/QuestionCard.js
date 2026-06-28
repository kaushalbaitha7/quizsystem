import React from "react";

function QuestionCard({
  question,
  selected,
  onSelect
}) {

  return (

    <div className="question-card">

      <h2>{question.question}</h2>

      {question.options.map((option, index) => (

        <label
          key={index}
          className="option"
        >

          <input
            type="radio"
            checked={selected === option}
            onChange={() => onSelect(option)}
          />

          {option}

        </label>

      ))}

    </div>

  );

}

export default QuestionCard;
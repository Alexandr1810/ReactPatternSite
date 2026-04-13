'use client'

import React, { useState } from 'react';
import QuestionsItem from './questions_item';

function QuestionsSection(props) {
  const [activeQuestion, setActiveQuestion] = useState(null);
  return (
    <section className="questionsSection" id='questions'>
        <h2 className="questionsSection-title">
          Частые вопросы
        </h2>
        <div className='questionsSection-container'>
          {props.questions_items.map((item, index) => (
            <QuestionsItem 
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              activeQuestion={activeQuestion}
              setActiveQuestion={(id)=>setActiveQuestion(id)}
            />
          ))}
        </div>
    </section>
  );
}

export default QuestionsSection;

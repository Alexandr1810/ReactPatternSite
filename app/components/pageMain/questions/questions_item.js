'use client'

import React, { useEffect, useRef } from 'react';
import { useInView } from '../../hooks/useInView';

function QuestionsItem(props) {
  const { ref, inView } = useInView();
  const answerRef = useRef(null);
  const isActive = props.index === props.activeQuestion;

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;

    if (isActive) {
      // раскрытие — ТОЛЬКО px
      const height = el.scrollHeight;
      el.style.height = height-30 + 'px';
    } else {
      // закрытие
      el.style.height = '0px';
    }
  }, [isActive]);

  return (
    <div ref={ref}
      className={`questionsSection-item ${isActive ? 'active' : ''} ${inView ? 'visible' : ''}`}
    >
      <div
        className="question"
        onClick={() =>
          isActive
            ? props.setActiveQuestion(null)
            : props.setActiveQuestion(props.index)
        }
      >
        <h3>{props.question}</h3>

        <div className="selected_indicator">
          <span className="plus">+</span>
          <span className="minus">-</span>
        </div>
      </div>

      <div className="answer" ref={answerRef}>
        <p>{props.answer}</p>
      </div>
    </div>
  );
}

export default QuestionsItem;

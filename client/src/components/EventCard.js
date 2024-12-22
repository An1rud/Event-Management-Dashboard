import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const EventCard = ({ event, onDelete, onEdit }) => {
  const formattedDate = format(new Date(event.date), 'MMM dd, yyyy');

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <StyledWrapper>
      <div className="brutalist-card">
        <div className="brutalist-card__header">
          <div className="brutalist-card__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 6v2h14V6H5zm2 4h10v2H7zm0 4h7v2H7z"/>
            </svg>
          </div>
          <div className="brutalist-card__alert">{truncateText(event.name, 20)}</div>
        </div>
        <div className="brutalist-card__message">
          <div className="message-header">
            <span className="location">{event.location}</span>
            <span className="date">{formattedDate}</span>
          </div>
          {truncateText(event.description, 100)}
        </div>
        <div className="brutalist-card__actions">
          <button 
            className="brutalist-card__button brutalist-card__button--mark" 
            onClick={() => onEdit(event)}
          >
            Edit Event
          </button>
          <button 
            className="brutalist-card__button brutalist-card__button--read" 
            onClick={() => onDelete(event._id)}
          >
            Delete Event
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .brutalist-card {
    width: 280px;
    border: 3px solid #000;
    background-color: #fff;
    padding: 1.25rem;
    box-shadow: 8px 8px 0 #000;
    font-family: "Arial", sans-serif;
  }

  .brutalist-card__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    border-bottom: 2px solid #000;
    padding-bottom: 0.75rem;
  }

  .brutalist-card__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    padding: 0.4rem;
  }

  .brutalist-card__icon svg {
    height: 1.25rem;
    width: 1.25rem;
    fill: #fff;
  }

  .brutalist-card__alert {
    font-weight: 900;
    color: #000;
    font-size: 1.25rem;
    text-transform: uppercase;
    word-break: break-word;
  }

  .brutalist-card__message {
    margin-top: 0.75rem;
    color: #000;
    font-size: 0.85rem;
    line-height: 1.4;
    border-bottom: 2px solid #000;
    padding-bottom: 0.75rem;
    font-weight: 600;
  }

  .message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .location {
    color: #296fbb;
    font-weight: 900;
  }

  .date {
    color: #666;
  }

  .brutalist-card__actions {
    margin-top: 0.75rem;
  }

  .brutalist-card__button {
    display: block;
    width: 100%;
    padding: 0.6rem;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 2px solid #000;
    background-color: #fff;
    color: #000;
    position: relative;
    transition: all 0.2s ease;
    box-shadow: 4px 4px 0 #000;
    overflow: hidden;
    text-decoration: none;
    margin-bottom: 0.75rem;
    cursor: pointer;
  }

  .brutalist-card__button--read {
    background-color: #000;
    color: #fff;
  }

  .brutalist-card__button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s;
  }

  .brutalist-card__button:hover::before {
    left: 100%;
  }

  .brutalist-card__button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #000;
  }

  .brutalist-card__button--mark:hover {
    background-color: #296fbb;
    border-color: #296fbb;
    color: #fff;
    box-shadow: 6px 6px 0 #004280;
  }

  .brutalist-card__button--read:hover {
    background-color: #ff0000;
    border-color: #ff0000;
    color: #fff;
    box-shadow: 6px 6px 0 #800000;
  }

  .brutalist-card__button:active {
    transform: translate(5px, 5px);
    box-shadow: none;
  }
`;

export default EventCard;

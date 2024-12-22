import React from 'react';
import styled from 'styled-components';
import { Person, Edit, Delete } from '@mui/icons-material';

const AttendeeCard = ({ attendee, onDelete, onEdit }) => {
  return (
    <StyledWrapper>
      <div className="brutalist-card">
        <div className="brutalist-card__header">
          <div className="brutalist-card__icon">
            <Person />
          </div>
          <div className="brutalist-card__alert">
            {attendee.name.length > 20 
              ? `${attendee.name.substring(0, 20)}...` 
              : attendee.name}
          </div>
        </div>
        
        <div className="brutalist-card__message">
          <div className="message-header">
            <span>{attendee.role || 'Attendee'}</span>
          </div>
          <div>{attendee.email}</div>
          <div>{attendee.phone || 'No phone'}</div>
        </div>

        <div className="brutalist-card__actions">
          <button 
            className="brutalist-card__button brutalist-card__button--mark"
            onClick={() => onEdit(attendee)}
          >
            <Edit /> Edit
          </button>
          <button 
            className="brutalist-card__button brutalist-card__button--read"
            onClick={() => onDelete(attendee._id)}
          >
            <Delete /> Delete
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

  .brutalist-card__actions {
    margin-top: 0.75rem;
  }

  .brutalist-card__button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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
    transform: translate(0, 0);
    box-shadow: none;
  }
`;

export default AttendeeCard;

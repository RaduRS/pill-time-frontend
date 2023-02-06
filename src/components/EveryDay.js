import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import classnames from "classnames";

import React, { useRef } from "react";

const EveryDay = ({
  setToComplete,
  setToIncomplete,
  handleInputChange,
  name,
  reminder,
  id,
  className,
}) => {
  const checkbox = useRef();

  const handleClick = () => {
    if (checkbox.current.checked) {
      setToComplete(reminder);
    } else {
      setToIncomplete(reminder);
    }
  };
  return (
    <Col className={classnames("am-and-pm", className)}>
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <div className="checkbox-rect">
            <input
              ref={checkbox}
              type="checkbox"
              checked={reminder.completed ? true : false}
              onChange={handleClick}
              id={reminder._id}
              name="check"
            />
            <label htmlFor={reminder._id}></label>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EveryDay;

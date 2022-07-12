import "./Notification.css";

export const showErrMsg = (msg) => {
  return <div className="fw-bold text-danger m-2">{msg}</div>;
};

export const showSuccessMsg = (msg) => {
  return <div className="fw-bold text-success m-2">{msg}</div>;
};

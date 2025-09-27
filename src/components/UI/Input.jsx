export default function ({ label, id, type = "text", ...props }) {
  return (
    <p className="control">
      <label htmlFor={id}>{label} </label>
      <input id={id} name={id} required type={type} {...props} />
    </p>
  );
}

export default function InputAtom({ register, name, type }) {
	return <input type={type} {...register(name)} className="rounded border border-1 border-blue-300" />;
}

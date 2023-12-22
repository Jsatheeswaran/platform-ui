export default function TextAreaAtom({ register, name }) {
	return <textarea {...register(name)} className="rounded border border-1 border-blue-300" />;
}

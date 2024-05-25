export default function TotalDuration({
  duration
}: {
  duration: number;
}) {
  return (
    <div className="bg-white w-8/12 flex mt-20 px-8 py-4">
      <div className="font-semibold">Total:</div>
      <div>{duration}</div>
    </div>
  )
}
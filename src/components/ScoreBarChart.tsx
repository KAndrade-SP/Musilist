import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface Props {
  distribution: number[]
}

export default function ScoreBarChart({ distribution }: Props) {
  const data = distribution.map((count, index) => ({
    score: index + 1,
    count,
  }))

  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid stroke="transparent" />

          <XAxis dataKey="score" tick={{ fontSize: 12, fill: '#ccc' }} axisLine={false} tickLine={false} />

          <Bar dataKey="count" fill="#8B5CF6" radius={[8, 8, 0, 0]} isAnimationActive={false} activeBar={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

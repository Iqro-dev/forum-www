import { LayoutProps } from '../types/props'
export default function FeedLayout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <main>{children}</main>
    </div>
  )
}

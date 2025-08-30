"use client"
import * as React from "react"

type UIState = { collapsed: boolean; setCollapsed: (v: boolean) => void }
const Ctx = React.createContext<UIState | null>(null)

export function UIStateProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <Ctx.Provider value={{ collapsed, setCollapsed }}>
      {/* Named group 'sidebar' so children can react to data attribute */}
      <div
        className="group/sidebar"
        data-collapsed={collapsed ? "icon" : "expanded"}
        style={
          {
            // @ts-ignore  (CSS var typing)
            "--sidebar-width": "260px",
            "--sidebar-width-icon": "84px",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </Ctx.Provider>
  )
}

export function useUIState() {
  const v = React.useContext(Ctx)
  if (!v) throw new Error("useUIState must be used inside UIStateProvider")
  return v
}

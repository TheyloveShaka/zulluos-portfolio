import React, { useEffect, useRef } from 'react'
import Window from '@components/windows/Window'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import { useWindows } from '@contexts/WindowsContext'
import { processCommand, config, getPrompt } from '@/utils/terminalCommandProcessor'
import { isMobile } from 'react-device-detect'

const TerminalWindow = () => {
  const { terminalWindow } = useWindows()

  const terminalRef = useRef<HTMLDivElement>(null)
  const terminal = useRef<Terminal | null>(null)
  const fitAddon = useRef<FitAddon | null>(null)

  const initializeTerminal = () => {
    if (terminalRef.current) {
      terminal.current = new Terminal(config)
      fitAddon.current = new FitAddon()
      terminal.current.loadAddon(fitAddon.current)
      terminal.current.open(terminalRef.current)
      fitAddon.current.fit()

      if (terminal.current) {
        if (isMobile) {
          processCommand('ipconfig', terminal.current)
        }
        processCommand('neofetch', terminal.current)
      }

      terminal.current.write(getPrompt())
      terminal.current.onData(handleTerminalData)
    }
  }

  let inputBuffer = ''

  const handleTerminalData = (data: string) => {
    if (data === '\r') {
      const command = inputBuffer
      terminal.current?.write('\r\n')
      if (terminal.current) {
        processCommand(command, terminal.current)
      }
      inputBuffer = ''
      terminal.current?.write(getPrompt())
    } else if (data === '\x7f') {
      if (inputBuffer.length > 0) {
        inputBuffer = inputBuffer.slice(0, -1)
        terminal.current?.write('\b \b')
      }
    } else {
      inputBuffer += data
      terminal.current?.write(data)
    }
  }

  useEffect(() => {
    initializeTerminal()

    return () => {
      if (terminal.current) {
        terminal.current.dispose()
      }
    }
  }, [])

  return (
    <Window window={terminalWindow}>
      <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />
    </Window>
  )
}

export default TerminalWindow


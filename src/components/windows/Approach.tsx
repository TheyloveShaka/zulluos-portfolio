import Window from './Window'
import { useWindows } from '@contexts/WindowsContext'

const MENU_ITEMS = ['File', 'Edit', 'Format', 'View', 'Help']

const PARAGRAPHS = [
  'Before I write a line of code, I look. I pull real references, actual sites that solve a piece of the problem well, and I name the specific thing worth taking from each one. Not a vague feeling, a specific move: this exact spacing, this exact interaction, this exact way of grouping information. If I can\'t point at it, I don\'t trust it.',
  'Then I plan. A build gets broken into phases, each with its own job: the visual direction, the structure of the pages, the actual components, the copy, the security pass, the check that it works. I write the plan down before I touch code, because a plan I can point back to is worth more than one I\'m improvising as I go.',
  'Only then do I build. And building isn\'t the last step, checking is. Every build gets looked over before I call it done: security, whether it actually works the way it\'s supposed to, and whether it matches the direction I set out to hit. I don\'t sign off on my own work without looking at it the way a stranger would.',
  'There\'s a human checkpoint in that process too. Before something ships, someone who isn\'t me looks at it and says yes or no. That\'s not bureaucracy, it\'s the difference between “I think this is good” and “this is actually good.”',
  'Mobile isn\'t an afterthought I get to after the desktop version looks nice. I design for a small screen from the start, because most of the people who\'ll actually see a site are holding one in their hand, not sitting at a desk.',
  'And images are not decoration, they\'re the product. A site with the right words and the wrong pictures still feels cheap. I source real images, generate the ones I can\'t source, or say plainly what\'s still missing, never a stand-in dressed up as the real thing.',
  'No filler. If a sentence doesn’t earn its place, it doesn’t ship.',
]

function Approach() {
  const { approachWindow } = useWindows()

  return (
    <Window window={approachWindow}>
      <div className="approach-content">
        <div className="approach-menu-row" aria-hidden="true">
          {MENU_ITEMS.join('   ')}
        </div>
        <div className="approach-paper">
          <h2 className="approach__title">My Approach</h2>
          {PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="approach__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Window>
  )
}

export default Approach

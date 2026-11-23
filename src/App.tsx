import { Navbar } from './components/Navbar'
import { HeroBrowserFrame } from './components/HeroBrowserFrame'
import { WorksSection } from './components/ProjectCard'
import { AboutExperience } from './components/AboutExperience'
import { ContactFooter } from './components/ContactFooter'

function App() {
  return (
    <div className="min-h-screen bg-obsidian text-text-primary">
      <Navbar />
      <main>
        <HeroBrowserFrame />
        <WorksSection />
        <AboutExperience />
        <ContactFooter />
      </main>
    </div>
  )
}

export default App

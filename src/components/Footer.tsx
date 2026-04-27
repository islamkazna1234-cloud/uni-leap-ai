const Footer = () => (
  <footer className="border-t border-border bg-secondary/40 mt-24">
    <div className="container py-10 grid gap-8 md:grid-cols-3">
      <div>
        <h4 className="font-semibold text-primary">Mentor.AI</h4>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
          AI-driven mentoring helping students in Kazakhstan and worldwide reach the right university.
        </p>
      </div>
      <div className="text-sm">
        <h5 className="font-semibold mb-2">Tools</h5>
        <ul className="space-y-1 text-muted-foreground">
          <li>Admission Calculator</li>
          <li>AI Essay Checker</li>
          <li>University Database</li>
        </ul>
      </div>
      <div className="text-sm">
        <h5 className="font-semibold mb-2">Regions</h5>
        <ul className="space-y-1 text-muted-foreground">
          <li>Kazakhstan • UNT</li>
          <li>USA • SAT / TOEFL</li>
          <li>UK & Europe • IELTS</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Mentor.AI — Built for ambitious students.
    </div>
  </footer>
);

export default Footer;

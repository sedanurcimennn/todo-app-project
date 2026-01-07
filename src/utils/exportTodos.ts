import { Todo, CATEGORY_LABELS } from '../types/todo';

export function exportToPDF(todos: Todo[]) {
  // Dynamic import for jsPDF
  import('jspdf').then((jsPDF) => {
    const { jsPDF: JSPDF } = jsPDF;
    const doc = new JSPDF();
    
    let yPos = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 8;
    
    // Title
    doc.setFontSize(18);
    doc.text('Todo Listesi', margin, yPos);
    yPos += 15;
    
    // Date
    doc.setFontSize(10);
    doc.text(`Oluşturulma Tarihi: ${new Date().toLocaleDateString('tr-TR')}`, margin, yPos);
    yPos += 10;
    
    // Stats
    const completed = todos.filter(t => t.completed).length;
    const active = todos.filter(t => !t.completed).length;
    doc.text(`Toplam: ${todos.length} | Aktif: ${active} | Tamamlanan: ${completed}`, margin, yPos);
    yPos += 15;
    
    // Todos
    doc.setFontSize(12);
    todos.forEach((todo, index) => {
      // Check if we need a new page
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
      }
      
      // Status icon
      const status = todo.completed ? '✓' : '○';
      doc.text(status, margin, yPos);
      
      // Todo text
      doc.setFont(todo.completed ? 'helvetica' : 'helvetica', 'bold');
      const text = todo.completed ? `[Tamamlandı] ${todo.text}` : todo.text;
      doc.text(text, margin + 10, yPos);
      yPos += lineHeight;
      
      // Category and deadline
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      let details = `Kategori: ${CATEGORY_LABELS[todo.category]}`;
      if (todo.deadline) {
        const deadline = new Date(todo.deadline);
        details += ` | Son Tarih: ${deadline.toLocaleDateString('tr-TR')}`;
      }
      doc.text(details, margin + 10, yPos);
      yPos += lineHeight + 3;
    });
    
    // Save
    doc.save(`todo-listesi-${new Date().toISOString().split('T')[0]}.pdf`);
  });
}

export function exportToText(todos: Todo[]) {
  let content = '═══════════════════════════════════════\n';
  content += '           TODO LİSTESİ\n';
  content += '═══════════════════════════════════════\n\n';
  content += `Oluşturulma Tarihi: ${new Date().toLocaleDateString('tr-TR')}\n`;
  content += `Toplam: ${todos.length} | Aktif: ${todos.filter(t => !t.completed).length} | Tamamlanan: ${todos.filter(t => t.completed).length}\n\n`;
  content += '═══════════════════════════════════════\n\n';
  
  todos.forEach((todo, index) => {
    const status = todo.completed ? '✓' : '○';
    content += `${index + 1}. ${status} ${todo.completed ? '[Tamamlandı] ' : ''}${todo.text}\n`;
    content += `   Kategori: ${CATEGORY_LABELS[todo.category]}`;
    if (todo.deadline) {
      const deadline = new Date(todo.deadline);
      content += ` | Son Tarih: ${deadline.toLocaleDateString('tr-TR')}`;
    }
    content += '\n\n';
  });
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `todo-listesi-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


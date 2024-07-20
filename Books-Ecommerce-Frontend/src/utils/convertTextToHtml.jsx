export const convertTextToHtml = (text) => {
    if(!text) return text;
    const paragraphs = text.split('\n\n'); // Tách các đoạn văn thành các đoạn riêng biệt
    const html = paragraphs.map(paragraph => `<p>${paragraph}</p> <br/>`).join('\n'); // Chuyển đoạn văn thành các thẻ <p>
    return html;
}
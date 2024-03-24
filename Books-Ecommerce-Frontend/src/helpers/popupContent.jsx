// popup Content
export const popupContent = (className, content) => {
    return (
        <div className={className || ''}>
            {content}
        </div>
    );
}
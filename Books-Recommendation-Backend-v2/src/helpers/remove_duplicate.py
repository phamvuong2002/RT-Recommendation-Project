def remove_duplicate_items(items, key):
    unique_items = {} 
    unique_list = []

    for item in items:
        item_key = item[key]
        if item_key not in unique_items:
            unique_items[item_key] = True
            unique_list.append(item)

    return unique_list
import matplotlib.pyplot as plt
import numpy as np

# Data for the time and space complexity of Bogo Sort
complexity_types = ['Best Case (Time)', 'Average Case (Time)', 'Worst Case (Time)', 'Space Complexity']
complexities = ['O(n)', 'O(n! * n)', 'O(∞)', 'O(1)']

# Set figure and axis
fig, ax = plt.subplots(figsize=(8, 6))

# Create a horizontal bar chart
y_pos = np.arange(len(complexity_types))
ax.barh(y_pos, [1, 5, 6, 0.1], color=['#4CAF50', '#FF9800', '#F44336', '#2196F3'])

# Add labels and title
ax.set_yticks(y_pos)
ax.set_yticklabels(complexity_types)
ax.invert_yaxis()  # Invert the y-axis so that the first item is on top
ax.set_xlabel('Time and Space Complexity')
ax.set_title('Time and Space Complexity of Bogo Sort')

# Add complexity text to each bar
for i, v in enumerate(complexities):
    ax.text(1.1, i, f'{v}', va='center', color='black', fontweight='bold')

# Remove x-axis ticks
ax.xaxis.set_ticks([])

# Save the image as a PNG file
file_path = '/home/msgs/algo/bogosort.png'
plt.savefig(file_path, bbox_inches='tight', transparent=False)

# Provide the file path for download
file_path = '/home/msgs/algo/bogosort.png'

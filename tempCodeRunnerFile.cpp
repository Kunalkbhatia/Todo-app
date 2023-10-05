#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <sstream>
#include <algorithm>

using namespace std;

// Function to compare word frequencies for sorting
bool compareFrequencies(const pair<string, int>& a, const pair<string, int>& b) {
    return a.second < b.second;
}

vector<string> distWords(string textinput) {
    unordered_map<string, int> wordFrequency;
    vector<string> result;

    stringstream ss(textinput);
    string word;

    while (ss >> word) {
        string cleanedWord = "";
        for (char c : word) {
            if (isalpha(c)) {
                cleanedWord += tolower(c);
            }
        }
        wordFrequency[cleanedWord]++;
    }

    vector<pair<string, int>> sortedWords(wordFrequency.begin(), wordFrequency.end());

    // Sort the words based on their frequencies in ascending order
    sort(sortedWords.begin(), sortedWords.end(), compareFrequencies);

    for (const auto& pair : sortedWords) {
        if (pair.second > 1) {
            result.push_back(pair.first);
        }
    }

    return result;
}

int main() {
    string text;
    getline(cin, text);

    vector<string> repeatedWords = distWords(text);

    cout << "Words that occur more than once, sorted by frequency in ascending order: ";
    for (const string& word : repeatedWords) {
        cout << word << " ";
    }
    cout << endl;

    return 0;
}

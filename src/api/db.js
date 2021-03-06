// db.js
module.exports = () => {
    const data = { documents: [], text: [], tokens: [] }

    const text = 'When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously.\
    “I can tell you very senior CEOs of major American car companies would shake my hand and turn away because I wasn’t worth talking to,” said Thrun, now the co-founder and CEO of online higher education startup Udacity, in an interview with Recode earlier this week.\
    A little less than a decade later, dozens of self-driving startups have cropped up while automakers around the world clamor, wallet in hand, to secure their place in the fast-moving world of fully automated transportation.';

    const tokens = text.split(' ');

    // create documents
    for (let i = 1; i <= 30; i++) {
        data.documents.push({
            id: i,
            documentName: `Document-${i}`,
        });

        for (let j = 0; j < tokens.length; j++) {
            let token = {
                id: j + 1,
                documentId: i,
                index: j,
                token: tokens[j],
                label: 'NA'
            }

            data.tokens.push(token);
        }
    }

    return data
}

// @ts-nocheck
import R from 'ramda'
import sanitizeHtml from 'sanitize-html'
import {Node} from 'slate'
export const walkSlateNodes = (elms: any, parseNode: any) =>
  R.reduce(
    (acc, item = {}, index) => {
      const {children} = item

      const result = parseNode(item, index)

      if (result) {
        return R.append(result, acc)
      }
      if (R.is(Array, children)) {
        return R.concat(acc, walkSlateNodes(children, parseNode))
      }

      return acc
    },
    [],
    R.is(Array, elms) ? elms : [],
  )

export const getLinkNode = node =>
  node.type === 'a' || node.type === 'link' ? R.pick(['url', 'title', 'description', 'publisher', 'author', 'date', 'image'], node) : undefined

/*
   modifySlateNodes will recursively walk a slate contents tree, and create a copy,
   modified by the given transformFn at the nodes for which the filterFn returns
   true.

   Note: when transforming a node, if you want modifySlateNodes to CONTINUE walking
   down the children array, the transformFn should *omit* the "children" attribute
   from the return value.
   If you want to REPLACE the children, provide the new "children" array in the
   return value.
   If you want to leave the original children UNCHANGED (without continuing
   recursion), then copy the original "children" array to the return value.
   If you want to REMOVE the children, explicitly set the "children" attribute to
   null (or an empty array) in the return value.

   See api test suite for example uses.
*/
export const modifySlateNodes = (elms, filterFn, transformFn) => {
  if (R.is(Array, elms)) {
    return R.map(e => modifySlateNodes(e, filterFn, transformFn), elms)
  } else if (R.is(Object, elms)) {
    if (filterFn(elms)) {
      const newElm = transformFn(elms)
      if (elms.children && elms.children.length) {
        if (newElm.children === null || R.equals(newElm.children, [])) {
          // new children is null (or empty array): remove entirely
          return R.dissoc('children', newElm)
        } else if (newElm.children) {
          // new element has children: return those
          return newElm
        }
        // new node does not have children, but old one does: recurse down old node's children
        const newChildren = R.map(e => modifySlateNodes(e, filterFn, transformFn), elms.children)
        return R.assoc('children', newChildren, newElm)
      }
      return R.dissoc('children', newElm)
    }
    const newChildren = elms.children && R.map(e => modifySlateNodes(e, filterFn, transformFn), R.prop('children', elms))
    return R.pipe(R.dissoc('children'), R.clone, R.when(R.always(newChildren), R.assoc('children', newChildren)))(elms)
  }
}

export const getMentionNode = ({type, userId, userSquuid}) => (type === 'mention' && R.is(Number, userId) ? {id: userId, userSquuid} : undefined)

export const getCommunityMentionNode = ({type, userId}) => (type === 'mention' && R.is(String, userId) ? userId : undefined)

export const getHashtagNode = ({type, value}) => (type === 'hashtag' ? value : undefined)

export const getHyperlinkNode = ({type, url}) => (type === 'a' ? url : undefined)

export const parseSlateNodes = elms => {
  return {
    mentions: walkSlateNodes(elms, getMentionNode).map(mentionsNode => {
      return mentionsNode?.userSquuid
    }),
    communityMentions: walkSlateNodes(elms, getCommunityMentionNode).map(id => mentionsNode?.userSquuid),
    hashtags: walkSlateNodes(elms, getHashtagNode),
    hyperlinks: R.uniq(walkSlateNodes(elms, getHyperlinkNode)).map((url, index) => ({
      url,
    })),
  }
}

export const editSlateParagraphNode = content =>
  modifySlateNodes(content, R.propEq('type', 'paragraph'), x => ({
    ...x,
    type: 'p',
  }))

export const stripDataFromBody = body => {
  const replacedBody = sanitizeHtml(body, {
    ...config,
    exclusiveFilter: frame => {
      return frame.tag === 'a' && frame.attribs.href && frame.attribs.href.includes('/user/')
    },
  })

  return R.replace(/<span contenteditable="false"><\/span>/g, ' redacted ', replacedBody)
}

export const getText = nodes => {
  return nodes
    .map(n => {
      const {children} = n
      if (children) {
        return getText(children)
      }
      return Node.string(n)
    })
    .join('\n')
}
